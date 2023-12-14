import { Helmet } from 'react-helmet';

const DynamicSketch = ({ scriptContent }) => {
  return (
    <>
      {scriptContent ? (
        <Helmet>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js" />
          <script type="text/javascript">{scriptContent}</script>
        </Helmet>
      ) : null}
    </>
  );
};
export default DynamicSketch;
