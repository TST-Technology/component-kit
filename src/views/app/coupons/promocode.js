/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Alert, Button, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { Colxx, Separator } from 'components/common/CustomBootstrap';

import {
  getTodoList,
  getTodoListWithOrder,
  getTodoListSearch,
  selectedTodoItemsChange,
} from 'redux/actions';
import PromoCodeList from 'components/coupons/PromoCodeList';
import AddNewPromoCode from 'containers/coupons/AddNewPromoCode';
// import PromoCodeMenu from 'containers/coupons/PromoCodeMenu';
import { addCoupon, deleteCoupon, getCoupon } from 'utils/API/api';
import IntlMessages from 'helpers/IntlMessages';
import AlertPopup from 'components/alert-popup';

// const getIndex = (value, arr, prop) => {
//   for (let i = 0; i < arr.length; i += 1) {
//     if (arr[i][prop] === value) {
//       return i;
//     }
//   }
//   return -1;
// };

const TodoApp = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  // const [lastChecked, setLastChecked] = useState(null);
  const [Coupons, setCoupons] = useState([]);
  const [currantCoupon, setCurrantCoupon] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoaded(true);
      const res = await getCoupon();
      if (res !== -1) {

        setCoupons(res?.data?.data?.data);
      }
      setLoaded(false);
    })();
  }, [refresh]);

  const DeleteCoupon = () => {
    (async () => {
      setLoaded(true);
      setIsModelOpen(false);
      const res = await deleteCoupon(currantCoupon.id);
      if (res !== -1) {
        setCoupons((previous) =>
          previous.filter((oldCoupon) => oldCoupon.id !== currantCoupon.id)
        );
      }
      setLoaded(false);
    })();
  };

  const addPromoCode = (coupon) => {

    (async () => {
      setLoaded(true);
      const res = await addCoupon(coupon);
      if (res !== -1) {
        setRefresh((previous) => !previous);
      }
      setLoaded(false);
    })();
  };
  return (
    <>
      <AlertPopup
        isOpen={isModelOpen}
        toggleModal={() => setIsModelOpen((previous) => !previous)}
        onPositive={DeleteCoupon}
        onNegative={() => setIsModelOpen((previous) => !previous)}
        positiveText="Agree"
        negativeText="cancel"
        warning="Aar you sure want to delete the coupon"
      />
      <Row className="app-row survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.promocode" />
            </h1>
            {!loaded && (
              <div className="text-zero top-right-button-container">
                <Button
                  color="primary"
                  size="lg"
                  className="top-right-button"
                  onClick={() => setModalOpen(true)}
                >
                  <IntlMessages id="promocode.add-new" />
                </Button>
              </div>
            )}
          </div>

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
            >
              <IntlMessages id="promocode.display-options" />{' '}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>
          </div>
          <Separator className="mb-5" />
          <Row>
            {!loaded ? (
              Coupons.length !== 0 &&
              Coupons.map((item, index) => (
                <PromoCodeList
                  key={`todo_item_${index}`}
                  item={item}
                  onDelete={(coupon) => {
                    setIsModelOpen(true);
                    setCurrantCoupon(coupon);
                  }}
                />
              ))
            ) : (
              <div className="loading" />
            )}
          </Row>
          {!loaded && Coupons.length === 0 && (
            <Alert color="danger" className="mt-4">
              <IntlMessages id="alert.danger-text" />
            </Alert>
          )}
        </Colxx>
      </Row>

      {/* {!loaded && Coupons.length !== 0 && <PromoCodeMenu />} */}
      <AddNewPromoCode
        toggleModal={() => setModalOpen(!modalOpen)}
        modalOpen={modalOpen}
        addPromoCode={addPromoCode}
      />
    </>
  );
};

const mapStateToProps = ({ todoApp }) => {
  const {
    Coupons,
    searchKeyword,
    loaded,
    orderColumn,
    orderColumns,
    selectedItems,
  } = todoApp;
  return {
    Coupons,
    searchKeyword,
    loaded,
    orderColumn,
    orderColumns,
    selectedItems,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getTodoListAction: getTodoList,
    getTodoListWithOrderAction: getTodoListWithOrder,
    getTodoListSearchAction: getTodoListSearch,
    selectedTodoItemsChangeAction: selectedTodoItemsChange,
  })(TodoApp)
);
