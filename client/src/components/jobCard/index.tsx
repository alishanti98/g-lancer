import {
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import './style.css';
import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import parse from 'html-react-parser';
import { JobPropsCard } from '../../interfaces';
import UserContext from '../../context';

function JobCard({
  job, children, handlerDeleted,
}: JobPropsCard) {
  const {
    title, description, id,
  } = job;

  const { user } = useContext(UserContext);

  return (
    <div className="content">
      <div className="job-card">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Link to={`/job/${job.id}`} className="link-description">
            <Typography
              variant="h5"
              gutterBottom
              color="primary"
            >
              {title}
            </Typography>
          </Link>
          {handlerDeleted && user?.userID === job.userId && job.isOccupied === false && (
            <IconButton
              aria-label="delete"
              onClick={() => handlerDeleted(id)}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
        <div className="description">
          <div>{parse(description)}</div>
        </div>
        <div className="second-section">
          {children}
        </div>
      </div>
    </div>

  );
}

export default JobCard;
