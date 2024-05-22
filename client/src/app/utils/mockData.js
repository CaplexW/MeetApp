/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import professions from '../mockData/professions.json';
import users from '../mockData/users.json';
import qualities from '../mockData/qualities.json';
import errorCatcher from './debug/errorCatcher';
import httpService from '../services/httpService';

export default function useMockData() {
  const status = {
    idle: 'Не начато',
    pending: 'В процессе',
    succeed: 'Готово',
    error: 'Произошла ошибка!',
  };
  const [error, setError] = useState('');
  const [currentStatus, setCurrentStatus] = useState(status.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = professions.length + users.length + qualities.length;

  useEffect(() => { updateProgress(); }, [count]);

  async function init() {
    try {
      for (const prof of professions) {
        await httpService.put(`profession/${prof._id}`, prof);
        incrementCount();
      }
      for (const quality of qualities) {
        await httpService.put(`quality/${quality._id}`, quality);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put(`user/${user._id}`, user);
        incrementCount();
      }
    } catch (err) {
      errorCatcher(err, setError);
    }
  }

  function updateProgress() {
    const updatedProgress = Math.floor((count / summaryCount) * 100);
    if (progress < updatedProgress) setProgress(() => updatedProgress);
    if (count !== 0 && currentStatus === status.idle) setCurrentStatus(status.pending);
    if (updatedProgress === 100) setCurrentStatus(status.succeed);
  }
  function incrementCount() {
    setCount((prevState) => prevState + 1);
  }
  return {
    init, error, progress, currentStatus,
  };
}
