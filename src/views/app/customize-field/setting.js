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
import { GetCoustomFields, setCustomizeFieldCharges } from 'utils/API/api';
import { NotificationManager } from 'components/common/react-notifications';
import SwitchExamples from 'containers/forms/SwitchExamples';

const SettingsPage = () => {
  const [texData, setTexData] = useState({});
  const [Loading, setLoading] = useState(true);
  const [fullPayToAdvisor, setFullPayToAdvisor] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await GetCoustomFields();
      setTexData(res?.data?.data?.data);
      setFullPayToAdvisor(res?.data?.data?.data?.fullPayToAdvisor);
      setLoading(false);
    })();
  }, []);

  const OnFromSubmitHandler = (e) => {
    e.preventDefault();
    (async () => {
      const payload = {
        inHouseAdvisorShare: +e.target.inHouseAdvisorShare.value,
        bonusAmount: +e.target.bonusAmount.value,
        fullPayToAdvisor,
      };

      const res = await setCustomizeFieldCharges(payload);
      if (res !== -1) {
        NotificationManager.success(
          `Data Updated`,
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
                <IntlMessages id="table.react-Customize-fields" />
              </CardTitle>
              <CardBody>
                <Form onSubmit={OnFromSubmitHandler}>
                  {CONSTANTS.CUSTOMIZE_FEILD.map((data) => (
                    <FormGroup key={data.id} row>
                      <Label for={data.label} sm={4}>
                        <IntlMessages id={data.tagId} />
                      </Label>
                      <Colxx sm={8}>
                        <Input
                          type={data.type}
                          name={data.name}
                          id={data.apiKey}
                          defaultValue={
                            texData[data.apiKey] ? texData[data.apiKey] : ''
                          }
                          placeholder={data.messages}
                        />
                      </Colxx>
                    </FormGroup>
                  ))}
                  <FormGroup row>
                    <Label for="fullPayToAdvisor" sm={4}>
                      <IntlMessages id="forms.system-charges" />
                    </Label>
                    <Colxx sm={8}>
                      <SwitchExamples
                        checked={fullPayToAdvisor}
                        onChange={() =>
                          setFullPayToAdvisor((previous) => !previous)
                        }
                      />
                    </Colxx>
                  </FormGroup>
                  <Button color="primary" disabled={Loading}>
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

export default injectIntl(SettingsPage);
