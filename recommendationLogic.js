const fs = require('fs');
const path = require('path');

function loadAllProblems() {
  const filePath = path.join(__dirname, 'AllProblems.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

function jaccardSimilarity(setA, setB) {
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

function getProblemTitleSet(title) {
  return new Set(title.toLowerCase().split(' '));
}

function findSimilarProblems(solvedProblems, allProblems) {
  const solvedProblemSets = solvedProblems.map(problem => ({
    id: problem.id,
    titleSet: getProblemTitleSet(problem.title)
  }));

  const allProblemSets = allProblems.stat_status_pairs.map(problem => ({
    title: problem.stat.question__title,
    titleSet: getProblemTitleSet(problem.stat.question__title),
    difficulty: problem.difficulty.level,
    paid_only: problem.paid_only,
    total_acs: problem.stat.total_acs,
    total_submitted: problem.stat.total_submitted
  }));

  let recommendations = [];

  for (const solved of solvedProblemSets) {
    for (const problem of allProblemSets) {
      if (solved.id !== problem.id) {
        const similarity = jaccardSimilarity(solved.titleSet, problem.titleSet);
        if (similarity < 1) {
          recommendations.push({ ...problem, similarity });
        }
      }
    }
  }

  recommendations.sort((a, b) => b.similarity - a.similarity);

  recommendations = recommendations.filter(
    rec => !solvedProblemSets.some(sp => sp.id === rec.id) && !rec.paid_only
  );

  return recommendations.slice(0, 10); 
}

module.exports = { findSimilarProblems, loadAllProblems };
