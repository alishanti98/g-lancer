import User from './User';
import Proposal from './Proposal';
import Job from './Job';
import Freelancer from './Freelancer';

Freelancer.hasMany(Proposal);
Freelancer.belongsTo(User);
User.hasOne(Freelancer);
Proposal.belongsTo(Freelancer);
Proposal.belongsTo(Job);
Job.hasMany(Proposal);
User.hasMany(Job);
Job.belongsTo(User);

export {
  User, Proposal, Job, Freelancer,
};