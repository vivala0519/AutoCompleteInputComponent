import { UserDataType, Mbti } from './type';

const users: UserDataType[] = require('./generated.json');

const cachedResultUsers: Record<string, UserDataType[]> = {};

const mbtis: Mbti[] = require('./mbti.json');

const cachedResultMbtis: Record<string, Mbti[]> = {};

export function findMatchedUsers(searchKeyword: string) {
  if (cachedResultUsers[searchKeyword]) {
    return cachedResultUsers[searchKeyword];
  }

  const filteredResult = users.filter(
    ({ email, name }) =>
      email.includes(searchKeyword) || name.includes(searchKeyword)
  );

  cachedResultUsers[searchKeyword] = filteredResult;
  return filteredResult;
}

export function findMatchedMbtis(searchKeyword: string) {
  if (cachedResultMbtis[searchKeyword]) {
    return cachedResultMbtis[searchKeyword];
  }

  const filteredResult = mbtis.filter(({ mbti }) =>
    mbti.includes(searchKeyword)
  );

  cachedResultMbtis[searchKeyword] = filteredResult;
  return filteredResult;
}
