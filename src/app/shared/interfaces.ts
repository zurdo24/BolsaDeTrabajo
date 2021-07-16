
export interface Login {
  user?: User;
  login?: boolean;
}

export interface Password_recovery {
  email?: string;
  recovery?: string;
}

export interface User {
  id?: string;
  username?: string;
  password_hash?: string;
  auth_key?: string;
  access_token?: string;
  email?: string;
  type?: string;
  send_info_courses?: number;
  registration_date?: string;
  last_login?: string;
}

export interface Candidate {
  user_id?: string;
  firstname?: string;
  lastname?: string;
  sex?: string;
  birth_date?: Date;
  marital_status?: string;
  curp?: string;
  phone?: string;
  cellphone?: string;
  city_id?: string;
  student_id_number?: string;
  organization_unit_id?: string;
  photo?: string;
  work_status?: boolean;
  work_status_date?: Date;
  token?: string;
}

export interface City {
  id?: string;
  name?: string;
  state_id?: string;
}

export interface State {
  id?: string;
  name?: string;
  country_id?: string;
}

export interface Country {
  id?: string;
  name?: string;
}


export interface OrganizationUnit {
  id?: string;
  name?: string;
  address?: string;
  email?: string;
  url?: string;
  phone?: string;
  logo?: string;
}


export interface Cv {
  candidate_id?: string;
  summary?: string;
  status?: string;
}

export interface WorkExperience {
  id?: string;
  cv_id?: string;
  company?: string;
  line_business_id?: string;
  job_title?: string;
  start?: string;
  end?: string ;
  month_start?: string;
  year_start?: string;
  month_end?: string;
  year_end?: string;
  description?: string;
  name?: string;
  is_current_job?: boolean;
}

export interface LineBusiness {
id?: string;
name?: string;
}
export interface CourseMode {
  id?: string;
  name?: string;
}

export interface Course {

  id?: string;
  cv_id?: string;
  name?: string;
  hours?: string;
  institution?: string;
  mode?: string;
  start?: string;
  end?: string;
}


export interface Language {
  id?: string;
  cv_id ?: string;
  language_list_id?: string;
  level_list_id?: string;
}


export interface LanguageList {
  id?: string;
  language?: string;
}

export interface LevelList {
  id?: string;
  level?: string;
}


export interface LanguageComplete {
  id?: string;
  cv_id ?: string;
  language_list_id?: string;
  language?: string;
  level_list_id?: string;
  level ?: string;
  bandera?: string;
}

export interface CvSkillComplete {
  cv_id ?: string;
  skill_list_id?: string;
  skill?: string ;
  color?: string;
}


export interface Skill {
  id ?: string;
  skill?: string;
}

export interface Education {
  id?: string;
  cv_id?: string;
  degree_id?: string;
  institution_name?: string;
  study_programme_id?: string;
  study_programme_name: string;
  subject_area_id?: string;
  status_education_id: string;
  start?: string;
  end?: string;
}
export interface StudyPrograme {
  id?: string;
  organization_unit_id?: string;
  subject_area_id?: string;
  name?: string;
  degree_id?: string;
}
export interface Degree {
  id?: string;
  title: string;
}
export interface StatusEducation {
  id?: string;
  name?: string;
}
export interface SubjectArea {
  id?: string;
  name?: string;
}
export interface AcademicTraining {
  education_id?: string;
  studyProgrameName?: string;
  start?: string;
  institutionName?: string;
  end?: string;
  degree?: string;
}
export interface Vacant {
  id?: string;
  job_title?: string;
  contact_id?: string;
  years_experience?: string;
  job_type_id?: string;
  city_id?: string;
  subject_area_id?: string;
  commercial_name?: string;
  skills?: Skill[];
  logo?: string;
  type?: string;
}


export interface JobsOpening {
  id?: string;
  contact_id?: string;
  job_title?: string;
  description?: string;
  subject_area_id?: string;
  years_experience?: string;
  job_type_id?: string;
  city_id?: string;
  openings?: string;
  social_benefits?: string;
  comments?: string;
  salary?: string;
  date_post?: string;
  date_expire?: string;
  status_id?: number;
  close_reminder?: string;
}

export interface JobType {
  id?: string;
  type?: string;
}

export interface Organization {
  contact_id?: string;
  commercial_name?: string;
  social_reason?: string;
  rfc?: string;
  description?: string;
  line_business_id?: string;
  number_employees_id?: string;
  email?: string;
  phone?: string;
  address?: string;
  city_id?: string;
  url?: string;
  logo?: string;
}

export interface OpeningSkill {
  opening_id?: string;
  skill_id?: string;
  skill?: string;
}

export interface Skill {
  id?: string;
  skill?: string;
}

export interface OpeningProgramme {
  id?: string;
  name?: string;
}

export interface OpeningLanguage {
  language_id?: string;
  level_id?: string;
  language?: string;
  level?: string;
}

export interface JobOpeningStatus {
  id?: string;
  status?: string;
}

export interface Message {
  id?: string;
  from_user_id?: string;
  to_user_id?: string;
  text?: string;
  html_text?: string;
  date_sent?: string;
  date_read?: string;
}

export interface JobApplicationStatusLogs {
  id?: string;
  cv_id?: string;
  opening_id?: string;
  message_id?: string;
  date?: string;
  type?: string;
}
// mi interface para ontener los chats
// tslint:disable-next-line: class-name
export interface contactsChat {
  id?: string;
  cv_id?: string;
  opening_id?: string;
  message_id?: string;
  date?: string;
  type?: string;
  contact_id?: string;
  commercial_name?: string;
  logo?: string;
  read?: string;
}

export interface Certification {
  id?: string;
  cv_id?: string;
  organization?: string;
  name?: string;
  subject_area_id?: string;
  date_received?: string;
  date_expire?: string;
}

export interface Applications{
  id?: string;
  cv_id?: string;
  opening_id?: string;
  message_id?: string;
  date?: string;
  type?: string;
  job_status?: string;
  job_title?: string;
  commercial_name?: string;
  logo?: string;
  skills?: string;
}

// 20-08-2020

export interface Match {
  city_id?: string;
  city_name?: string;
  commercial_name?: string;
  id?: string;
  job_title?: string;
  job_type_id?: string;
  logo?: string;
  salary?: string;
  score?: number;
  skills?: Skill[];
  studyprogramme?: Studyprogramme[];
  subject_area_id?: string;
  type?: string;
  years_experience?: number;
}

export interface Studyprogramme {
  id?: string;
  name?: string;
}

export interface CvMatch {
  job_opening_id?: string;
  cv_id?: string;
  score?: number;
  modified?: string;
  notified?: string;
}
