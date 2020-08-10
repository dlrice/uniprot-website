import React, { FC } from 'react';
import { Loader, CodeBlock, InfoList } from 'franklin-sites';

import ErrorHandler from '../../shared/components/error-pages/ErrorHandler';

import { UseDataAPIState } from '../../shared/hooks/useDataApi';

import toolsURLs from '../config/urls';

import { PublicServerParameters } from '../types/toolsServerParameters';
import { JobTypes } from '../types/toolsJobTypes';

function inputToCurl<T extends JobTypes>(
  input: Partial<PublicServerParameters[T]>,
  jobType: T
) {
  let command = "curl -F 'email=<enter your email here>' \\\n";
  for (const [key, value] of Object.entries(input)) {
    command += `     -F '${key}=${value}' \\\n`;
  }
  command += `     ${toolsURLs(jobType).runUrl}`;
  return command;
}

type Props = {
  id: string;
  inputParamsData: Partial<UseDataAPIState<PublicServerParameters[JobTypes]>>;
  jobType: JobTypes;
};

const ToolInput: FC<Props> = ({ id, inputParamsData, jobType }) => {
  const { loading, data, error, status } = inputParamsData;

  if (loading) return <Loader />;

  if (error || !data) return <ErrorHandler status={status} />;

  const infoData = Object.entries(data).map(([key, value]) => {
    return {
      title: key,
      content: <CodeBlock lightMode>{value}</CodeBlock>,
    };
  });

  return (
    <section>
      <p>
        The job with UUID {id} has been submitted with these raw input values:
      </p>
      <InfoList infoData={infoData} />
      <p>
        You can refer to the documentation for these values on the{' '}
        <a href="https://www.ebi.ac.uk/seqdb/confluence/pages/viewpage.action?pageId=94147939#NCBIBLAST+HelpandDocumentation-RESTAPI">
          API documentation page
        </a>
      </p>
      <p>
        Using{' '}
        <a
          href="https://curl.haxx.se/"
          target="_blank"
          rel="noreferrer noopener"
        >
          curl
        </a>
        , you could run a new job on the command line with the same input like
        this:
      </p>
      <CodeBlock lightMode>{inputToCurl(data, jobType)}</CodeBlock>
      {data.sequence.includes("'") && (
        <p>
          <small>
            You might need to escape the sequence as it contains special
            characters
          </small>
        </p>
      )}
    </section>
  );
};

export default ToolInput;