import { JSONitem, parseVotesArray } from './parseVotes';
import votes from '../../data/resultado-1-turno-presidente-2014.json';

const parsed = parseVotesArray((votes as JSONitem[]));

export default parsed;
