import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { userActions } from 'src/modules/Login/reducers/userReducer'
import { connect } from 'react-redux'

class Header extends React.Component {
  render() {
    return (
      <header className="container-fluid col-12">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/clients">
                  Клиенты
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entries">
                  Отчет по текущей деятельности
                </Link>
              </li>
            </ul>

            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-secondary"
                href="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.props.username}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <button className="dropdown-item" onClick={this.props.onLogOut}>
                  Выйти
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  username: state.user.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () =>
    dispatch({
      type: userActions.LOG_OUT,
    }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
