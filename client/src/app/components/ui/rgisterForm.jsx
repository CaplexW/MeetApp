/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../common/form/inputField';
import showElement from '../../utils/debug/showElement';
import SelectInput from '../common/form/selectInput';
import RadioInput from '../common/form/radioInput';
import MultiSelectInput from '../common/form/multiSelectInput';
import Checkbox from '../common/form/checkbox';
import { sexOptions } from '../../constants';
import Form from '../common/form';
import { getQualities, getQualitiesLoadingStatus } from '../../store/qualities';
import Loader from '../common/loader';
import { getProfessions, getProfessionsLoadingStatus } from '../../store/professions';
import { signUp } from '../../store/users';

export default function RegisterForm() {
  const defaultData = {
    email: '', name: '', password: '', profession: '', sex: 'male', qualities: [], licence: false,
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Введите e-mail',
      },
      isEmail: {
        message: 'Не корректный e-mail',
      },
    },
    name: {
      isRequired: {
        message: 'Введите ваше имя',
      },
      minLength: {
        message: 'Имя не может быть меньше 2-х символов',
        value: 2,
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
    licence: {
      isAccepted: {
        message: 'Необходимо принять соглошение',
      },
    },
  };
  const [isLoading, setLoading] = useState(true);
  const professions = useSelector(getProfessions());
  const professionsIsLoading = useSelector(getProfessionsLoadingStatus());
  const qualities = useSelector(getQualities());
  const qualitiesIsLoading = useSelector(getQualitiesLoadingStatus());
  const dispatch = useDispatch();

  useEffect(() => { checkLoading(); }, [qualitiesIsLoading, professionsIsLoading]);
  function checkLoading() {
    setLoading((qualitiesIsLoading || professionsIsLoading));
  }

  function createUserAvatar(seed) {
    return `https://api.dicebear.com/8.x/avataaars/svg?seed=${seed}.svg`;
  }
  async function handleSubmit(data) {
    const newUser = {
      email: data.email,
      name: data.name,
      password: data.password,
      profession: data.profession,
      sex: data.sex,
      qualities: data.qualities.map((q) => q.value),
      rate: 0,
      completedMeetings: 0,
      image: createUserAvatar(data.email),
    };

    dispatch(signUp(newUser));
  }

  const loaderReason = 'qualitites in registerForm is loading';
  if (isLoading) return <Loader reason={loaderReason} />;
  return (
    <div>
      <h2>Регистрация</h2>
      <Form onSubmit={handleSubmit} validatorConfig={validatorConfig} dataScheme={defaultData}>
        <InputField
          label="Электронная почта"
          name="email"
          type="text"
          placeholder="adress@mail.com"
        />
        <InputField
          label="Ваше имя"
          name="name"
          type="text"
          placeholder="Джеймс Бонд"
        />
        <InputField
          label="Пароль"
          name="password"
          type="password"
          placeholder="It1sAGo0dP@ss!"
        />
        <SelectInput
          label="Ваша профессия"
          name="profession"
          defaultOption="Выберете профессию"
          options={professions}
        />
        <MultiSelectInput
          label="Ваши качества"
          name="qualities"
          options={qualities}
        />
        <RadioInput
          label="Пол:"
          name="sex"
          options={sexOptions}
        />
        <Checkbox name="licence" value={defaultData.licence}>
          Подтвердите
          <a href=""> лицензионное соглашение</a>
        </Checkbox>
        <button
          type="submit"
          className="btn btn-primary mt-2 mx-auto w-100"
        >
          Зарегестрироваться
        </button>
      </Form>
      <span id="form-changer" className="w-100">
        Уже есть аккаунт?
        {' '}
        <a href="/login">Авторизируйтесь!</a>
      </span>
    </div>
  );
}
