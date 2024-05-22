import React from 'react';
import useMockData from '../utils/mockData';

export default function MainPage() {
  const {
    init, error, progress, currentStatus,
  } = useMockData();
  function handleClick() {
    init();
  }
  return (
    <div className="container">
      <div className="m-5">
        <h3>Инициализация нормолизации конфигурации</h3>
        <ul>
          <li>
            Статус:
            {' '}
            {currentStatus}
          </li>
          <li>
            Прогресс:
            {' '}
            {progress}
          </li>
          {error && <li>{error}</li>}
        </ul>
        <button className="btn btn-primary m-1" type="button" onClick={handleClick}>Инициализация</button>
      </div>
    </div>
  );
}
