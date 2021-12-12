import Fuse from "fuse.js";
import { difference } from "lodash";

export const API = {
  LOGIN: '/signin',
  SIGNUP: '/signup',
  ME: "/me",

  ALL_USERS: "/users",

  ENROLL_EVENTS: "/event/create",
  GET_ENROLLMENTS: "/event/fetchAll",
  MARK_ATTENDANCE: "/event/attendance",
  MARK_RESULT: "/event/result",
  DELETE_EVENT: "/event/delete",
  ADD_TEAM: "/event/team",

  GET_SPORTS: "/sport/fetchAll",
  GET_ANNOUNCEMENTS: "/announcement/fetchAll"
}


export interface ConstantData {
  title: string;
  value: string;
}

export interface ConstantDataNumber {
  title: string;
  value: number;
}

export const GENDER: ConstantData[] = [
  { title: 'Female', value: 'Female' },
  { title: 'Male', value: 'Male' },
];

export const ATTENDANCE: ConstantData[] = [
  { title: 'Not Marked', value: 'not_marked' },
  { title: 'Present', value: 'present' },
  { title: 'Absent', value: 'absent' }
];

export const RESULT: ConstantDataNumber[] = [
  { title: 'None', value: 0 },
  { title: 'First', value: 1 },
  { title: 'Second', value: 2 },
  { title: 'Third', value: 3 },
]

export const ATTENDANCE_COLOR: any = {
  not_marked: "secondary",
  present: "success",
  absent: "danger"
}

export const COURSE: ConstantData[] = [
  { title: 'B.Tech', value: 'b_tech' },
  { title: 'M.Tech', value: 'm_tech' },
  { title: 'B.Arch', value: 'b_arch' },
  { title: 'BCA', value: 'bca' },
  { title: 'MCA', value: 'mca' },
];

export const BRANCH: ConstantData[] = [
  { title: 'Computer Science', value: 'cse' },
  { title: 'Information Technology', value: 'it' },
];

export const SPORT_TYPE = [
  { title: 'Field', value: 'field' },
  { title: 'Track', value: 'track' },
  { title: 'Tug of war', value: 'tugofwar' },
  { title: 'Relay', value: 'relay' }
];

export const mapValue = (key: string, selectedValue: string) => {
  let data: (ConstantData | ConstantDataNumber)[];
  switch (key) {
    case 'GENDER':
      data = GENDER;
      break;
    case 'ATTENDANCE':
      data = ATTENDANCE;
      break;
    case 'COURSE':
      data = COURSE;
      break;
    case 'BRANCH':
      data = BRANCH;
      break;
    case 'SPORT_TYPE':
      data = SPORT_TYPE;
      break;
    case 'RESULT':
      data = RESULT;
      break;
    default:
      data = [];
  }
  if (data.length) {
    const found: ConstantData | ConstantDataNumber | undefined = data
      .find((node: ConstantData | ConstantDataNumber) => node.value.toString() === selectedValue?.toString());
    return found ? found.title : '';
  }
  return '';
}

export const REGEX = {
  PHONE_NUMBER: /^[0-9]{10}$/,
  UNIVERSITY_NO: /^[0-9]{7}$/,
  PASSWORD: /^[\s\S]{8,25}$/,
  EMAIL: /^[a-zA-Z]+\d{7}@gndec.ac.in$/i
}

export const mergeSearch = ({ search, data, options: newOptions }: { search: string; data: any, options: any }) => {
  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    threshold: 0.3,
    ...newOptions
  };
  const fuse = new Fuse(data, options);
  const searchedItems = fuse.search(search).map((node) => node.item);
  if (searchedItems.length) {
    const allOtherObjects = difference(data, searchedItems);
    return [...searchedItems.map((node: any) => ({ ...node, isSearched: true })), ...allOtherObjects]
  }
  return data;
}
