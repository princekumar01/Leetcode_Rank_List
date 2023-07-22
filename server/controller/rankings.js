const fetch = require("node-fetch");
const model = require("../models/contest");
const Contest = model.Contest;
const fetchContestRankings = async function (contestSlug) {
  try {
    let contest = await Contest.findById(contestSlug);
    //console.log(contest.updated)
    if (contest.lastUpdated > 3) return;
    contest.rankings = [];
    let resp = await fetch(
      `https://leetcode.com/contest/api/ranking/${contestSlug}/?region=global`
    );
    resp = await resp.json();
    let pages = Math.ceil(resp.user_num / 25);
    let all_rankings = [];
    let failed = [];
    let flag = false;
    let lastPage = 800;
    const fetchPageRankings = async (pageNo, retries, throwError = false) => {
      if (pageNo > lastPage) {
        return;
      }
      try {
        let res = await fetch(
          `https://leetcode.com/contest/api/ranking/${contestSlug}/?pagination=${pageNo}&region=global`
        );
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        res = await res.json();

        rankings = res.total_rank.map((ranks) => {
          let { username, rank, score, finish_time } = ranks;
          let ranking = {
            username,
            rank,
            score,
            finish_time,
          };
          if (score == 0) {
            flag = true;
          }
          ranking["_id"] = username;
          return ranking;
        });
        if (flag == true) {
          lastPage = Math.min(lastPage, pageNo);
        }
        all_rankings = all_rankings.concat(rankings);
        //console.log(`Fetched rankings (${contestSlug} page: ${pageNo})`);
      } catch (err) {
        if (retries > 0) {
          await fetchPageRankings(pageNo, retries - 1);
        } else if (throwError) {
          throw err;
        } else {
          failed.push(pageNo);
        }
      }
    };

    const limit = 5;
    const maxRetries = 5;
    for (let i = 0; i < pages; i += limit) {
      let promises = [];
      for (let j = 0; j < limit && i + j < pages; j++) {
        promises.push(fetchPageRankings(i + j + 1, maxRetries));
      }
      await Promise.all(promises);
    }
    for (let i = 0; i < failed.length; i++) {
      await fetchPageRankings(failed[i], maxRetries, true);
    }
    console.log(`(${contestSlug}) Rankings fetched from leetcode!`);
    all_rankings.sort((a, b) => (a.rank > b.rank ? 1 : -1));
    contest.rankings = all_rankings;
    contest.lastUpdated+=1;
    //console.time(`Saving rankings in db (${contestSlug})`);
    await contest.save();
    //console.timeEnd(`Saving rankings in db (${contestSlug})`);
    //console.log(`Updated rankings in db (${contestSlug}).`);
  } catch (err) {
    return [null, err];
  }
};

const fetchContestsMetaData = async () => {
  //console.log("fetching meta data for all contests...");
  try {
    let res = await fetch("https://leetcode.com/graphql", {
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "https://leetcode.com/contest/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: `{"operationName":null,"variables":{},"query":"{\
                currentTimestamp\
                allContests {\
                    containsPremium\
                    title\
                    titleSlug\
                    startTime\
                    duration\
                    originStartTime\
                    isVirtual\
                  }\
              }\
              "}`,
      method: "POST",
      mode: "cors",
    });
    res = await res.json();
    for (let i = 0; i < 22; i++) {
      let contest = res.data.allContests[i];
      let contestExists = await Contest.exists({
        _id: contest.titleSlug,
      });
      if (contestExists) {
        continue;
      }
      const today = new Date();
      const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(),today.getHours(),today.getMinutes());
      const date = new Date(contest.startTime*1000);
      if(date > currentDay){
      continue;
      }
      let newContest = new Contest({
        _id: contest.titleSlug,
        title: contest.title,
        startTime: contest.startTime * 1000,
        lastUpdated: 0,
      });
      await newContest.save();
      console.log(`created new contest: ${contest.titleSlug}`);
    }
    //console.log("Fetched contests' meta data");
    //return res.data.allContests;
  } catch (err) {
    console.error(err);
    //return null;
  }
};

// exports
exports.fetchContestsMetaData = fetchContestsMetaData;
exports.fetchContestRankings = fetchContestRankings;
