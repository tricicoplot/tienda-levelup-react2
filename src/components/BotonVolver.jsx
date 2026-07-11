import { useNavigate } from 'react-router-dom';

function BotonVolver() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="btn" style={{ marginBottom: '20px' }}>
      ⬅ Volver atrás
    </button>
  );
}
export default BotonVolver;