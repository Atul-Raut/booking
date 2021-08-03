import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function Requesttable() {
  const { t } = useTranslation();
  const [data, setdata] = useState([]);
  const [modalShow, setmodalShow] = useState(false);
  const [modalUser, setmodalUser] = useState({
    userId: 0,
    driverName: "",
    contactNo: "",
    experience: "",
    ratings: [],
  });

  const requestedUsers = [
    {
      userId: 1,
      driverName: "Atul Raut",
      contactNo: "+91 7429019031",
      experience: "5 years",
      ratings: [1, 2, 3],
    },
    {
      userId: 2,
      driverName: "Ravi Aglave",
      contactNo: "+91 7429019222",
      experience: "3 years",
      ratings: [1, 2],
    },
  ];

  useEffect(() => {
    setdata(requestedUsers);
    return () => {
      "cleanup;";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openModal(user) {
    console.log(user);
    {
      user
        ? setmodalUser((preState) => ({
            ...preState,
            contactNo: user.contactNo,
            driverName: user.driverName,
            ratings: user.ratings,
            experience: user.experience,
          }))
        : setmodalUser((preState) => ({
            ...preState,
          }));
    }

    {
      modalShow ? setmodalShow(false) : setmodalShow(true);
    }
  }

  return (
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
              {data.map((user) => (
                <tr key={user.userId}>
                  <td className="text-center">{user.driverName}</td>
                  {/* <td>{user.contactNo}</td> */}
                  {/* <td>{user.experience}</td> */}
                  <td className="text-center">
                    {user.ratings.map((rating) => (
                      <span className="fa fa-star checked" />
                    ))}
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      onClick={() => openModal(user)}
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
      <Modal show={modalShow} onHide={() => openModal(modalUser)}>
        <Modal.Header closeButton>{t("popupDriverDetailsLbl")}</Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-5">
              <labe>{t("name")} :&nbsp;</labe>
              <span>{modalUser.driverName}</span>
            </div>
            <div className="col-sm-5">
              <labe>{t("tblHeadRatings")} :&nbsp;</labe>
              {modalUser.ratings.map((rating) => (
                <span className="fa fa-star checked" />
              ))}
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-5">
              <labe>{t("popupContactNoLbl")} &nbsp;</labe>
              <span>{modalUser.contactNo}</span>
              {/* <span>{modalUser.experience}</span> */}
            </div>
            <div className="col-sm-5">
              <labe>{t("popupExperienceLbl")} &nbsp;</labe>
              <span>{modalUser.experience}</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => openModal(modalUser)}>
            {t("popupCloseBtn")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Requesttable;
