/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import Devider from '../common/divider';
import Form from '../common/form';
import TextAreaInput from '../common/form/textAreaInput';

export default function AddCommentForm({ onSubmit, isGuest }) {
  const validatorConfig = {
    text: {
      isRequired: {
        message: 'Введите тест комментария',
      },
    },
  };
  const emptyInputs = { text: '' };
  function handleSubmit(data) {
    const comment = {
      content: data.text,
    };
    onSubmit(comment);
  }

  if (isGuest) return '';
  return (
    <div id="add-comment-card" className="card mb-2">
      <div className="card-body">
        <h1>Добавить комментарий</h1>
        <Devider />
        <Form onSubmit={handleSubmit} validatorConfig={validatorConfig} dataScheme={emptyInputs}>
          <TextAreaInput name="text" label="Сообщение" rows={3} />
          <button className="mt-3 btn btn-primary w-100" type="submit">Добавить</button>
        </Form>
      </div>
    </div>
  );
}

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isGuest: PropTypes.bool,
};
AddCommentForm.defaultProps = {
  isGuest: false,
};
