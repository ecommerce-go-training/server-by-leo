import { Gender } from '@/common/enums';

const GENDER = `${Object.values(Gender).join('|')}`;

const BOD = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i;

export default {
  BOD,
  GENDER,
};
