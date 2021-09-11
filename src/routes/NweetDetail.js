import React from "react"

class NweetDetail extends React.Component {
  componentDidMount() {
    const { location, history } = this.props
    if (location.state === undefined) {
      history.push("/")
    }
  }

  render() {
    const { location } = this.props
    if (location.state) {
      return (
        <div>
          <div className="nweetProfile">
            <h3>
              {location.state.userObj.photoURL &&
                <img src={location.state.userObj.photoURL} width="50px" height="50px" />}
              {location.state.userObj.displayName}
            </h3>
          </div>
          <h4>
            {location.state.nweetObj.text}
          </h4>
          {location.state.nweetObj.attachmentUrl &&
            <img src={location.state.nweetObj.attachmentUrl} width="50px" height="50px" />}
        </div>
      )
    } else {
      return null
    }
  }
}

export default NweetDetail
