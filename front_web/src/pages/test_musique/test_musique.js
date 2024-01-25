import React, { useEffect, useRef } from 'react';

function MaPageAvecMusique() {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.play();
  }, []);

  return (
    <div>
      <h1>Ma Page avec Musique</h1>
      <audio ref={audioRef} autoPlay>
        <source src="musique.ogg" type="audio/mpeg" />
        Votre navigateur ne prend pas en charge l'élément audio.
      </audio>
    </div>
  );
}

export default MaPageAvecMusique;