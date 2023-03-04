import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Input,
  FormGroup,
  Label,
  Form,
  CardTitle,
  Container,
  Spinner,
  Button,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import { Colxx } from 'components/common/CustomBootstrap';

import IntlMessages from 'helpers/IntlMessages';
import CONSTANTS from 'utils/CONSTANTS';
import { getTaxCharges, setTaxCharges } from 'utils/API/api';
import { NotificationManager } from 'components/common/react-notifications';

const FormLayoutsUi = ({ intl, location }) => {
  const { messages } = intl;
  const [texData, setTexData] = useState({});
  const [Loading, setLoading] = useState(true);

  const currentAdvisor = location.pathname.replace(
    `/app/customize-field/call-amount/`,
    ''
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getTaxCharges(currentAdvisor);
      console.log(res?.data?.data?.data[0]);
      setTexData(
        res?.data?.data?.data.length > 0 ? res?.data?.data?.data[0] : {}
      );
      setLoading(false);
    })();
  }, [currentAdvisor]);

  const OnFromSubmitHandler = (e) => {
    e.preventDefault();
    (async () => {
      const payload = {
        taxPerc: +e.target.taxPerc.value,
        serviceChargePerc: +e.target.serviceChargePerc.value,
        avgDuration: +e.target.avgDuration.value,
      };

      const res = await setTaxCharges(texData?.id, payload);
      if (res !== -1) {
        NotificationManager.success(
          `${currentAdvisor}'s Data Updated`,
          'Update Data',
          3000,
          null,
          null,
          ''
        );
      }
    })();
  };
  return (
    <>
      {!Loading ? (
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardTitle
                style={{
                  marginTop: '31px',
                  marginBottom: '10px',
                  fontWeight: '800',
                  marginLeft: '27px',
                }}
              >
                <p>{currentAdvisor}</p>
              </CardTitle>
              <CardBody>
                <Form onSubmit={OnFromSubmitHandler}>
                  {CONSTANTS.CALL_AMOUNT.map((data) => (
                    <FormGroup key={data.id} row>
                      <Label for={data.label} sm={3}>
                        <IntlMessages id={data.tagId} />
                      </Label>
                      <Colxx sm={9}>
                        <Input
                          type={data.type}
                          name={data.name}
                          id={data.apiKey}
                          defaultValue={
                            data.apiKey ? texData[data?.apiKey] : ''
                          }
                          placeholder={
                            data.messages ? messages[data?.messages] : ''
                          }
                        />
                      </Colxx>
                    </FormGroup>
                  ))}
                  <Button color="primary">
                    <IntlMessages id="forms.submit" />
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      ) : (
        <Container className="d-flex justify-content-center align-items-center">
          <Spinner
            animation="border"
            className="d-inline-flex m-2 "
            color="$theme-color-yellow-granola"
          />
        </Container>
      )}
    </>
  );
};

export default injectIntl(FormLayoutsUi);
