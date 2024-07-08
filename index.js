const express = require('express');
const { getSubmissions } = require('leetapi');
const { findSimilarProblems, loadAllProblems } = require('./recommendationLogic');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const allProblems = loadAllProblems();

app.get('/recommend/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const submissions = await getSubmissions(username);

    const solvedProblems = submissions.data.recentAcSubmissionList.map(submission => ({
      id: submission.id,
      title: submission.title,
      timestamp: new Date(submission.timestamp * 1000).toISOString()
    }));

    const recommendations = findSimilarProblems(solvedProblems, allProblems);

    res.render('recommendations', { username, submissions: submissions.data.recentAcSubmissionList, recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch submissions.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
