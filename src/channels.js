import React from 'react'

class Channels extends React.Component {

  handleClick(id) {
    this.props.handleSelected(id)
  }

  render() {
    return (
      <ul className="list-unstyled channels">
        {
          this.props.channels.map((channel) =>
            <li key={channel.id}>
              <a href="#" className={channel.id == this.props.selected ? "selected" : ""} selected onClick={this.handleClick.bind(this, channel.id)} > {channel.name} </a>
            </li>
          )
        }
      </ul>
    )
  }
}

export default Channels;