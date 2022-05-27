// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUi } from 'contexts/UI';
import { PageProps } from '../types';
import {
  PageRowWrapper,
  RowPrimaryWrapper,
  RowSecondaryWrapper,
} from '../../Wrappers';
import {
  SectionWrapper,
  SectionHeaderWrapper,
} from '../../library/Graphs/Wrappers';
import { PageTitle } from '../../library/PageTitle';
import { StatBoxList } from '../../library/StatBoxList';
import { OpenAssistantIcon } from '../../library/OpenAssistantIcon';
import { useApi } from '../../contexts/Api';
import { PoolList } from '../../library/PoolList';
import { usePools } from '../../contexts/Pools';
import ActivePoolsStatBox from './Stats/ActivePools';
import MinJoinBondStatBox from './Stats/MinJoinBond';
import MinCreateBondStatBox from './Stats/MinCreateBond';
import { Status } from './Status';
import { ManageBond } from './ManageBond';
import { ManagePool } from './ManagePool';
import { APIContextInterface } from '../../types/api';
import { Roles } from './Roles';

export const Pools = (props: PageProps) => {
  const { page } = props;
  const { title } = page;
  const { network } = useApi() as APIContextInterface;
  const navigate = useNavigate();
  const { bondedPools, isBonding, isNominator, membership } = usePools();
  const { isSyncing } = useUi();

  // back to overview if pools are not supported on network
  useEffect(() => {
    if (!network.features.pools) {
      navigate('/#/overview', { replace: true });
    }
  }, [network]);

  return (
    <>
      <PageTitle title={title} />
      <StatBoxList>
        <ActivePoolsStatBox />
        <MinJoinBondStatBox />
        <MinCreateBondStatBox />
      </StatBoxList>
      <PageRowWrapper className="page-padding" noVerticalSpacer>
        <RowPrimaryWrapper hOrder={1} vOrder={0}>
          <Status />
        </RowPrimaryWrapper>
        <RowSecondaryWrapper hOrder={0} vOrder={1}>
          <SectionWrapper height={310}>
            <ManageBond />
          </SectionWrapper>
        </RowSecondaryWrapper>
      </PageRowWrapper>
      {isBonding() && (
        <>
          <ManagePool />
          <PageRowWrapper className="page-padding" noVerticalSpacer>
            <SectionWrapper>
              <Roles />
            </SectionWrapper>
          </PageRowWrapper>
        </>
      )}
      <PageRowWrapper className="page-padding" noVerticalSpacer>
        <SectionWrapper>
          <SectionHeaderWrapper>
            <h2>
              {isBonding() || isSyncing ? 'Pools' : 'Join a Pool'}
              <OpenAssistantIcon page="pools" title="Nomination Pools" />
            </h2>
          </SectionHeaderWrapper>
          <PoolList
            pools={bondedPools}
            title="Active Pools"
            allowMoreCols
            pagination
          />
        </SectionWrapper>
      </PageRowWrapper>
    </>
  );
};

export default Pools;
