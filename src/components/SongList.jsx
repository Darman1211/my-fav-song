import React from 'react';

const SongList = ({ dataSong }) => {
  return (
      <div className="wrapper-list-song">
        {dataSong.map((item, index) => {
            return (
                <div key={item.id}>
                    <h4>{item.name}</h4>
                </div>
            )
        })}
      </div>
  )
}

export default SongList