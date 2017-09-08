const CampaignBlocks = ({ buttonAction, content, campaignInfo }) => {
  switch (content.type) {
    case 'paragraph':
      return <p>{content.nodes[0].ranges[0].text}</p>;
    case 'header':
      return (
        <h2>
          <span className="underlined">{content.nodes[0].ranges[0].text}</span>
        </h2>
      );
    case 'image':
      switch (content.data.imageType) {
        case 'main':
          return (
            <div>
              <div className="main-image-wrapper">
                {campaignInfo.endDate
                  ? null
                  : <div className="overlay"></div>}
                <div className="main-image">
                  <img
                    src={content.data.src}
                    alt={content.data.alt}
                    className={content.data.imageType} />
                </div>
                {campaignInfo.endDate
                  ? null
                  : <button className="secondary" onClick={buttonAction}>Make a Donation</button>}
              </div>
              {campaignInfo.endDate
                ? null
                : (
                  <button className="primary mobile" onClick={buttonAction}>
                    Make a Donation
                  </button>
                )}
            </div>
          );
        case 'left':
          return (
            <img
              src={content.data.src}
              alt={content.data.alt}
              className={content.data.imageType} />
          );
        case 'right':
          return (
            <img
              src={content.data.src}
              alt={content.data.alt}
              className={content.data.imageType} />
          );
        default:
          return null;
      }
    default:
      return null;
  }
};

export default CampaignBlocks;
