import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import showElement from '../../utils/debug/showElement';
import Form, {
  InputField, SelectInput, MultiSelectInput, RadioInput,
} from '../common/form';
import { sexOptions } from '../../constants';
import { professionScheme, qualityScheme, userScheme } from '../../mockData/propTypesScheme';
import { getQualitiesByIds } from '../../store/qualities';
import { updateUser } from '../../store/users';

export default function UserEditForm({ user, professions, qualities }) {
  const dispatch = useDispatch();
  const userQualities = useSelector(getQualitiesByIds(user.qualities));
  const defaultData = {
    email: user.email,
    name: user.name,
    profession: user.profession,
    sex: user.sex,
    qualities: userQualities.map((q) => ({
      label: q?.name,
      value: q?._id,
    })),
  };
  const redirectTo = useNavigate();
  const validatorConfig = {
    name: {
      isRequired: {
        message: 'Введите имя',
      },
    },
    email: {
      isRequired: {
        message: 'Введите e-mail',
      },
      isEmail: {
        message: 'Не корректный e-mail',
      },
    },
    password: {
      isRequired: {
        message: 'Введите пароль',
      },
      isCapitalSymbol: {
        message: 'В пароле должна быть хотя бы 1 заглавная буква',
      },
      isContainsDigits: {
        message: 'В пароле должна быть хотя бы 1 цифра',
      },
      minLength: {
        message: 'В пароле должно быть минимум 8 символов',
        value: 8,
      },
    },
    profession: {
      isRequired: {
        message: 'Выберите профессию',
      },
    },
  };

  function handleSubmit(data) {
    const updatingUser = { ...user };

    updatingUser.name = data.name;
    updatingUser.email = data.email;
    updatingUser.sex = data.sex;
    updatingUser.profession = data.profession;
    updatingUser.qualities = data.qualities.map((q) => q.value);
    dispatch(updateUser(updatingUser))
      .then((success) => { if (success) redirectTo(`/users/${user._id}`); });
  }

  return (
    <div id="user-edit-form-container" className="col-md-4 offset-md-4 shadow p-4 mt-2">
      <h2>Измените данные</h2>
      <Form onSubmit={handleSubmit} validatorConfig={validatorConfig} defaultData={defaultData}>
        <InputField label="Имя" name="name" autoFocus />
        <InputField label="Электронная почта" name="email" />
        <SelectInput
          name="profession"
          label="Профессия"
          defaultOption="Выберете профессию"
          options={professions}
        />
        <MultiSelectInput
          label="Качества"
          name="qualities"
          options={qualities}
        />
        <RadioInput
          label="Пол:"
          name="sex"
          options={sexOptions}
        />
        <button
          type="submit"
          className="btn btn-primary mt-2 mx-auto w-100"
        >
          Обновить
        </button>
      </Form>
    </div>
  );
}

UserEditForm.propTypes = {
  user: PropTypes.shape(userScheme).isRequired,
  professions: PropTypes.arrayOf(PropTypes.shape(professionScheme)).isRequired,
  qualities: PropTypes.arrayOf(PropTypes.shape(qualityScheme)).isRequired,
};
