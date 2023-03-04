import React from 'react';
import moment from 'moment';
import { Card, CardBody, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { MenuItem } from 'react-contextmenu';
import { Colxx } from '../common/CustomBootstrap';

const PromoCodeList = ({ item, onDelete }) => {
  return (
    <>
      <Colxx xxs="12">
        <Card className="card d-flex mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              <NavLink
                to={`/app/coupons/promoDetails/${item.id}`}
                id={`toggler${item.id}`}
                className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
              >
                <i
                  className={`${item.status === 'ACTIVE'
                      ? 'simple-icon-check heading-icon'
                      : 'simple-icon-refresh heading-icon'
                    }`}
                />
                <span className="align-middle d-inline-block">
                  {item.couponCode}
                </span>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-xs-100">
                User Count: {item.id}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-xs-100">
                {moment(item.createdAt).local().format('Do MMMM, YYYY')}
              </p>
              <div className="w-15" style={{ fontSize: '20px' }}>
                <Badge color={item.labelColor} pill>
                  {`${item.discountPerc} %`}
                </Badge>
              </div>
              <MenuItem
                onClick={() => onDelete(item)}
              // onClick={onContextMenuClick}
              // data={{ action: 'delete' }}
              >
                <i className="simple-icon-trash" />
              </MenuItem>
            </CardBody>
          </div>
          <div className="card-body pt-1">
            <p className="mb-0">{item?.detail}</p>
          </div>
        </Card>
      </Colxx>
    </>
  );
};

export default React.memo(PromoCodeList);
