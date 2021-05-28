export const API = {
  LOGIN: '/signin',
  SIGNUP: '/signup',
  ALL_USERS: "/users",
  ME: "/me",
  GET_SPORTS: "/sport/fetchAll",
  GET_ENROLLMENTS: "/event/fetchAll",
  ENROLL_EVENTS: "/event/create",
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

export const ATTENDANCE_COLOR: any = {
  not_marked: "secondary",
  present: "success",
  absent: "danger"
}

export const COURSE: ConstantData[] = [
  { title: 'B.Tech', value: 'b_tech' },
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
    default:
      data = [];
  }
  if (data.length) {
    const found: ConstantData | ConstantDataNumber | undefined = data
      .find((node: ConstantData | ConstantDataNumber) => node.value.toString() === selectedValue.toString());
    return found ? found.title : '';
  }
  return '';
}