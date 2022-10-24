import { Request, Response } from 'express';
import { FreelancerWithProposalsInstance, ProposalInstance } from '../interfaces';
import { Freelancer, Proposal, User } from '../models';

const getFreelancer = async (req: Request, res: Response) => {
  const paramsUserId = req.params.id;
  const { userID } = res.locals.user;

  const freelancer: FreelancerWithProposalsInstance | null = await Freelancer.findOne(
    {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Proposal,
          where: { isAccepted: userID === Number(paramsUserId) ? [false, true] : true },
          required: false,
        }],
      where: { userId: paramsUserId },
    },
  );

  if (freelancer) {
    const acceptedProposals: ProposalInstance[] = [];
    const pendingProposals: ProposalInstance[] = [];
    freelancer?.proposals.forEach((p: ProposalInstance) => {
      if (p.isAccepted) {
        acceptedProposals.push(p);
      } else {
        pendingProposals.push(p);
      }
    });
    const freelancerUser = freelancer.toJSON();
    if (userID === Number(paramsUserId)) {
      freelancerUser.proposals = { acceptedProposals, pendingProposals };
    } else {
      freelancerUser.proposals = { acceptedProposals };
    }
    return { status: 200, data: freelancerUser };
  }
  return { status: 404, msg: 'Freelancer Not Found' };
};

export default getFreelancer;
