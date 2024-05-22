/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { getQualitiesByIds, getQualitiesLoadingStatus, loadQualities } from '../../../store/qualities';
import Loader from '../../common/loader';

export default function QualitiesList({ qualitiesIds, onFilter }) {
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualities = useSelector(getQualitiesByIds(qualitiesIds));
  const dispatch = useDispatch();

  useEffect(() => { dispatch(loadQualities()); }, []);

  if (isLoading) return <Loader min />;
  return qualities.map((quality) => (
    <span key={quality.name} role="button" onClick={() => onFilter(quality._id)} tabIndex={0} className={`badge  m-1 bg-${quality.color}`}>
      {quality.name}
    </span>
  ));
}
QualitiesList.propTypes = {
  qualitiesIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilter: PropTypes.func,
};
QualitiesList.defaultProps = {
  onFilter: () => { },
};
