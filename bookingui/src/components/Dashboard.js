import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Modal, Button, Toast } from "react-bootstrap";

function Dashboard() {
  const [loadRequestFlag, setloadRequestFlag] = useState(false);
  const [modalShow, setmodalShow] = useState(false);
  const [showToast, setshowToast] = useState(false);

  //const [requestedUsers, setdriversData] = useState({});
  const { t } = useTranslation();
  const style = {
    color: "purple",
    //   fontSize: 200
  };

  const count = [1, 2].length;

  const requestedUsers = [
    {
      userId: 1,
      driverName: "Atul Raut",
      contactNo: "+91 7429019031",
      experience: "5 years",
      ratings: [3],
    },
    {
      userId: 2,
      driverName: "Ravi Aglave",
      contactNo: "+91 7429019222",
      experience: "3 years",
      ratings: [3],
    },
  ];

  const [driversData, setdriversData] = useState(requestedUsers);
  const [driverDetails, setdriverDetails] = useState({
    contactNo: "",
    experience: "",
  });
  function loadRequest() {
    setdriversData(requestedUsers);
    modalShow ? setmodalShow(false) : setmodalShow(true);
    if (!modalShow) {
      setshowToast(false);
    }
    if (loadRequestFlag) {
      setloadRequestFlag(false);
    } else {
      setloadRequestFlag(true);
    }
  }

  function showToastPop(driver) {
    setdriverDetails({
      contactNo: driver.contactNo,
      experience: driver.experience,
    });
    showToast ? setshowToast(false) : setshowToast(true);
  }

  return (
    <>
      {/* <div className="row"> */}

      <div className="conatainer-fluid dashboradiv marginMobile">
        <div className="row ">
          <div className="col-sm-12">
            <div className="col-sm-12 d-flex justify-content-center ">
              <span className="spanMrgn">
                <b style={style}>{t("dashboardTitle")}</b>
              </span>
            </div>
            <hr className="hrL"></hr>
          </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-5 divtopMargin">
            <span>
              <b>{t("dashboardRequirement")}</b>
            </span>
            <span>House Shiffting</span>
            <br />
            <span>
              <b>{t("dashboardSomeDetails")}</b>
            </span>
            <span>Wanted to shift house related stuff</span>
          </div>
          <div className="col-sm-6 divtopMargin">
            <span>
              <b>{t("dashboardDateLookingFor")}</b>
            </span>
            <span>2021-08-01:09:30 - 2021-08-01:12:00 </span>
            <br />
            <span>
              <b>{t("dashboardVehicleType")}</b>
            </span>
            <span>Tempo</span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-5 divtopMargin">
            <span>
              <b>{t("dashboardFromPlace")}</b>
            </span>{" "}
            <span>Pune </span>
            <span>
              <b>{t("dashboardToPlace")}</b>
            </span>
            <span>Mumbai </span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-5 divtopMargin">
            <br />
            <button
              type="button"
              className="btn-success button"
              placeholder="5 pepole sent request"
              onClick={loadRequest}
            >
              {t("dashboardrequestsentBtn", { count })}
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              type="button"
              className=" btn-primary button"
              placeholder="5 pepole sent request"
            >
              {t("dashboardSearchProviderBtn")}
            </button>
          </div>
          <div className="col-sm-5 divtopMargin">
            <br />
            <button
              type="button"
              className="btn-warning button"
              placeholder="Update post"
            >
              {t("dashboardUpdatePostBtn")}
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              type="button"
              className="btn-danger button"
              placeholder="Remove Post"
            >
              {t("dashboardRemovePostBtn")}
            </button>
          </div>
        </div>
      </div>
      {/* {loadRequestFlag ? ( */}

      <Modal show={modalShow} onHide={() => loadRequest(driversData)}>
        <Modal.Header closeButton>{t("popupDriverDetailsLbl")}</Modal.Header>
        <Modal.Body>
          <div className="col-sm-12 d-flex justify-content-center ">
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-12 table-responsive">
                <Table className="table  table-bordered table-hover">
                  <thead>
                    <tr className="bg-info">
                      <th className="text-center">{t("tblHeadDriverName")}</th>
                      {/* <th>Contact No</th> */}
                      {/* <th>Experience</th> */}
                      <th className="text-center">{t("tblHeadRatings")}</th>
                      <th className="text-center">{t("tblHeadAction")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {driversData.map((user) => (
                      <tr key={user.userId}>
                        <td className="text-center">{user.driverName}</td>
                        {/* <td>{user.contactNo}</td> */}
                        {/* <td>{user.experience}</td> */}
                        <td className="text-center">
                          <span className="fa fa-star checked" />
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            onClick={() => showToastPop(user)}
                            className="button btn-primary btnMrgn"
                          >
                            {t("tblActionGetDetailBbn")}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="toastDiv">
            <Toast show={showToast} onClose={showToastPop}>
              <Toast.Header className="backColorToastHeader">
                <img
                  hidden="true"
                  src="http://placekitten.com/50/50"
                  className="rounded mr-2"
                  alt=""
                />
                <strong className="mr-auto">Contact Details</strong>
                <small></small>
              </Toast.Header>
              <Toast.Body className="backColorToastBody">
                <span>Contact No: {driverDetails.contactNo}</span>
                <br />
                <span>Experience : {driverDetails.experience}</span>
              </Toast.Body>
            </Toast>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => loadRequest(requestedUsers)}>
            {t("popupCloseBtn")}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ) : ( */}
      {/* " "
      )} */}
      <div className="col-sm-1"></div>
    </>
  );
}

export default Dashboard;
