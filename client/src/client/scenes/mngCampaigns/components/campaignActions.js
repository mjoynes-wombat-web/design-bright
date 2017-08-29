import { Link } from 'react-router-dom';

const CampaignActions = ({ name, k, id, launch, stop, startDate, endDate }) => (
  <article className="small-12 columns">
    <div className="row">
      <h2 className="small-12 columns">
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
      <div className={`shrink columns campaign-action launch${startDate ? ' disabled' : ''}`}>
        <button onClick={() => launch(id)} disabled={startDate}>
          <span className="icon"></span><span className="text">Launch Campaign</span>
        </button>
      </div>
      <div className="small-12 columns show-for-small-only"></div>
      <div  className={`shrink columns campaign-action stop${startDate === null ? ' disabled' : ''}`}>
        <button onClick={() => stop(id)} disabled={startDate === null ? true : endDate}>
          <span className="icon"></span><span className="text">Stop Campaign</span>
        </button>
      </div>
      <div className="small-12 columns show-for-small-only"></div>
      <div className="shrink columns campaign-action edit">
        <Link to={`/campaigns/edit/${id}`}>
          <span className="icon"></span><span className="text">Edit Campaign</span>
        </Link>
      </div>
    </div>
    <hr className="small-10 medium-7 large-8 columns" />
  </article>
);

export default CampaignActions;
