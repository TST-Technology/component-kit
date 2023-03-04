import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'reactstrap';
import {
  addSpecializations,
  deleteSpecializations,
  getSpecializations,
  updateSpecialization,
} from 'utils/API/api';
import CONSTANTS from 'utils/CONSTANTS';
import AddNewModal from 'utils/Modal';
import Papa from 'papaparse';
import ViewTable from 'utils/ReactTableCards';
import IntlMessages from 'helpers/IntlMessages';

export default function Expertise({ currentAdvisor }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [refreash, setRefreash] = useState(false);
  const [percentage, setPercentage] = useState(['Adding users', 0]);

  const updateAction = (expertise) => {
    (async () => {
      const payload = {
        id: expertise.id,
        searches: expertise.newCount,
      };
      const res = await updateSpecialization(payload);
      if (res !== -1) {
        NotificationManager.success(
          `${expertise.specialization}'s Count Updated`,
          'Update Count',
          3000,
          null,
          null,
          ''
        );
      }
    })();
  };

  const deleteHandler = (expertise) => {
    (async () => {
      setLoading(true);
      await deleteSpecializations(expertise.id);
      setLoading(false);
      setData((previous) =>
        previous
          .filter((expertiseItem) => expertiseItem.id !== expertise.id)
          .map((expertiseItem, index) => {
            return { ...expertiseItem, no: index + 1 };
          })
      );
    })();
  };

  const addSpecializationsHandler = (e) => {
    e.preventDefault();
    (async () => {
      const payload = {
        expertise: currentAdvisor,
        specialization: e.target.specialization.value,
      };
      setLoading(true);
      const res = await addSpecializations(payload);
      if (res !== -1) {
        setModalOpen(!modalOpen);
      }

      setLoading(false);
      setRefreash((Previous) => !Previous);
    })();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getSpecializations(currentAdvisor);

        setData(
          res?.data?.data?.data.map((expertise, index) => {
            return {
              ...expertise,
              no: index + 1,
              action: [() => deleteHandler(expertise), false],
              search: [
                expertise.searches,
                (e) => updateAction({ ...expertise, newCount: e.target.value }),
              ],
            };
          })
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentAdvisor, refreash]);

  const addBulkSpecializationsHandler = (userArr) => {
    (async () => {
      setLoading(true);

      await Promise.all(
        userArr.map(async (item, index) => {
          try {
            const payload = {
              expertise: currentAdvisor,
              specialization: item,
            };

            await addSpecializations(payload);
            setPercentage(['Adding users', (index / userArr.length) * 100]);
          } catch (e) {
            NotificationManager.warning(
              `${item} is not correct Formate For Mobile number`,
              3000,
              null,
              null,
              ''
            );
          }
          return item + 1;
        })
      );

      setRefreash((previous) => !previous);
      setPercentage(['Adding users', 0]);
      setLoading(false);
    })();
  };

  const addExpertisetoCsv = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const userArr = [];
        Object.values(results.data).map((mobileNumber) => {
          const [userMobileNumber] = Object.values(mobileNumber);
          console.log('userMobileNumber', userMobileNumber);
          userArr.push(userMobileNumber);
          return 0;
        });

        addBulkSpecializationsHandler(userArr);
      },
    });
  };

  return !loading ? (
    <>
      <AddNewModal
        sidebarMenu="LAWYER_EXPERTISE"
        dataId={CONSTANTS.TABLE_ID.add}
        modalTitle={CONSTANTS.TABLE_ID.addModal}
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        onSubmit={addSpecializationsHandler}
      />
      <label
        htmlFor="userCsv"
        style={{ marginTop: '-53px', position: 'absolute' }}
      >
        <input
          style={{
            position: 'absolute',
            marginLeft: '10px',
            width: '171px',
            height: '37px',
            opacity: '0',
          }}
          type="file"
          accept=".csv"
          id="userCsv"
          onChange={(e) => addExpertisetoCsv(e?.target?.files[0])}
        />
        <Button
          outline
          type="cancel"
          color="primary"
          style={{
            marginLeft: 'auto',
            marginBottom: '14px',
            right: '15px',
            top: '-50px',
            zIndex: '100',
          }}
          className="top-right-button"
        >
          <IntlMessages id="table.react-button-expertise-user" />
        </Button>
      </label>

      <ViewTable
        headers={CONSTANTS.TABLE_HEADER.EXPERTISE}
        items={data
          .filter((advisor) => advisor.expertise === currentAdvisor)
          .map((advisor, index) => {
            return {
              ...advisor,
              no: index + 1,
            };
          })}
        advisorId={currentAdvisor}
        filterParams="specialization"
      />
    </>
  ) : (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ flexDirection: 'column' }}
    >
      {percentage[1] > 0 && (
        <p>{`${percentage[0]} ${percentage[1].toFixed(0)}%`}</p>
      )}
      <Spinner
        animation="border"
        className="d-inline-flex m-2 "
        color="$theme-color-yellow-granola"
      />
    </Container>
  );
}
