import { Link } from 'react-router-dom';

const CampaignActions = ({ name, id, launch, stop, startDate, endDate }) => (
  <article className="small-10 medium-7 large-8 columns">
    <div className="row">
      <h2 className="columns small-12">
        <span className="underlined">
          {name}
        </span>
      </h2>
      {
        startDate !== null
          ? <p className="small-12 columns">
            Campaign Started on {(new Date(Date.parse(startDate))).toLocaleDateString()}.
          </p>
          : null
      }
      {
        endDate !== null
          ? <p className="small-12 columns">
            Campaign Stopped on {(new Date(Date.parse(endDate))).toLocaleDateString()}.
          </p>
          : null
      }
      <div className={`shrink columns campaign-action${startDate ? ' stop' : ' launch'}`}>
        <button onClick={startDate ? () => stop(id) : () => launch(id)} disabled={endDate}>
          <span className="icon">{startDate ? '' : ''}</span><span className="text">{startDate ? 'Stop' : 'Launch'} Campaign</span>
        </button>
      </div>
      <div className="small-12 columns show-for-small-only"></div>
      <div className="shrink columns campaign-action edit">
        <Link to={`/campaign/edit/${id}`}>
          <span className="icon"></span><span className="text">Edit Campaign</span>
        </Link>
      </div>
      <div className="small-12 columns show-for-small-only"></div>
      <div className="shrink columns campaign-action edit">
        <Link to={`/campaign${startDate ? '' : '/preview'}/${id}`}>
          <span className="icon"></span><span className="text">{startDate ? 'View' : 'Preview'} Campaign</span>
        </Link>
      </div>
    </div>
    <hr />
  </article>
);

export default CampaignActions;
