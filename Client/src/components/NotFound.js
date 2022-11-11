import React, {Component} from 'react';
import './NotFound.scss';

class NotFound extends Component {
  // Class used to render the message in case of wrong URL typed by user or server not reached
  render() {
    return (
      <div className="not-found">
        <h2>404</h2>
        <h3>NOT FOUND</h3>
        <h4>{`Server can't reach, please check your connection and try again!`}</h4>
      </div>
    );
  }
}

export default NotFound;
