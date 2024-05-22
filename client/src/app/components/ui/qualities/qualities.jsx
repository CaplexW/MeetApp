import React from 'react';

export default function Qualities(user) {
  return user.qualities.map((quality) => (
    <span key={quality.name} className={`badge  m-1 bg-${quality.color}`}>
      {quality.name}
    </span>
  ));
}
