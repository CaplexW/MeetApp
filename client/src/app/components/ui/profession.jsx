import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getProfessionById, getProfessionsLoadingStatus } from '../../store/professions';
import Loader from '../common/loader';

export default function Profession({ id }) {
  const profession = useSelector(getProfessionById(id));
  const professionsIsLoading = useSelector(getProfessionsLoadingStatus());

  if (professionsIsLoading) return <Loader min />;
  return <p className="small">{profession.name}</p>;
}
Profession.propTypes = {
  id: PropTypes.string.isRequired,
};
