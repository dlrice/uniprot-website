import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'franklin-sites';

import { Job } from '../../blast/types/blastJob';

import Row from './Row';

import './styles/Dashboard.scss';

// temporary
// import created from '../../blast/__mocks__/internal-jobs/created';
// import failedBeforeSubmission from '../../blast/__mocks__/internal-jobs/failed-after-submission';
// import failedAfterSubmission from '../../blast/__mocks__/internal-jobs/failed-before-submission copy';
// import finished from '../../blast/__mocks__/internal-jobs/finished';
// import running from '../../blast/__mocks__/internal-jobs/running';

const sortNewestFirst = (a: Job, b: Job) => b.timeCreated - a.timeCreated;

const Dashboard = () => {
  const jobs = (useSelector((state) =>
    Object.values(state.tools)
  ) as Job[]).sort(sortNewestFirst);
  // const tools: Array<Job> = [
  //   created,
  //   failedBeforeSubmission,
  //   failedAfterSubmission,
  //   finished,
  //   running,
  // ];

  return (
    <section>
      <p>
        Your tool analysis results from the last 7 days are listed below. For
        any tools still running, you can navigate away to other pages and will
        be notified once the job is finished.
      </p>
      <div className="dashboard">
        <div className="dashboard__header">
          <Card>
            <span>Name</span>
            <span>Job type</span>
            <span>Created</span>
            <span>Status</span>
          </Card>
        </div>
        <div className="dashboard__body">
          {jobs.map((job) => (
            <Row job={job} key={job.internalID} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
