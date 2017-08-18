import React from 'react';

class Messages extends React.Component {
  render() {
    return (
      <div className="row">
          <div className="col-md-12">
                <div className="media">
                    <img className="d-flex mr-3" />
                        <div className="media-body">
                            <h5 className="mt-0">Media heading</h5>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                </div>
          </div> 
      </div>
    );
  }
}

export default Messages;