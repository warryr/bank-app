import React from 'react';
import $ from 'jquery';
import { setFieldsFromInput } from './../../util/domUtil';
import { connect } from 'react-redux';
import { login } from '../../apiRequests/userApiRequests';
import { actions } from '../../reducers/userReducer';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFail = this.onFail.bind(this);
  }

  render() {
    return (
      <form>
        <label htmlFor='username'>Имя пользователя</label>
        <input id='username' type='text'/>
        <label htmlFor='password'>Пароль</label>
        <input id='password' type='password'/>
        <p id='serverError' hidden>Неправильное имя пользователя или пароль</p>
        <button type='button' onClick={this.onLogin}>Войти</button>
      </form>
    );
  }

  onLogin() {
    const user = {};
    setFieldsFromInput(user, ['username', 'password']);

    login(user, this.onSuccess, this.onFail);
  }

  onSuccess(object) {
    this.props.saveToken(object.token);
    $('#serverError').attr('hidden', '');
  }

  onFail() {
    $('#serverError').removeAttr('hidden');
    $('form').find('#username, #password').val('');
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  saveToken: token => {
    dispatch({
      type: actions.SAVE_TOKEN,
      token
    })
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

