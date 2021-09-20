
import React from 'react';

export default class DashboardGlobalCache  {
  constructor(props) {
  }
}

global.DASHBOARD_GLOBAL_Data = {};

export const clearDashboardCache = ()=>{
  global.APP_GLOBAL_Data = {};
}


/**
 * set data into global veriable
 * @param {key} key 
 * @param {value} value
 */
 export const setDashboardDashboardCache = (key,value) => {
  global.DASHBOARD_GLOBAL_Data[key] = value;
}

/**
 * retrive data from global veriable
 * @param {key} key 
 * @returns value
 */
export const getDashboardDashboardCache = (key) => {
  return global.DASHBOARD_GLOBAL_Data[key];
}

export const setSelectedPost = (post, index) => {
  setDashboardDashboardCache("selectedPost", post);
  setDashboardDashboardCache("selectedPostIndex", index);
}

export const getSelectedPost = () => {
  let post = getDashboardDashboardCache("selectedPost");
  let index = getDashboardDashboardCache("selectedPostIndex");
  return {post, index}
}

export const setUpdatedPost = (post) => {
  setDashboardDashboardCache("updatedPost");
}

export const getUpdatedPost = () => {
  let post = getDashboardDashboardCache("updatedPost");
  return post
}


export const setIsUpdatePost = () => {
  setDashboardDashboardCache("isUpdatePost", true);
}

export const resetIsUpdatePost = () => {
  setDashboardDashboardCache("isUpdatePost", false);
}

export const isUpdatePost = () => {
  return getDashboardDashboardCache('isUpdatePost');
}

