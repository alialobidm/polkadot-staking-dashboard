// Copyright 2022 @rossbulat/polkadot-staking-experience authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { backgroundLabel, backgroundSecondary, textSecondary } from '../../../theme';

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column wrap;
  width: 100%;

  h3 {
    margin-bottom: 1.2rem;
  }
`;
export const Item = styled(motion.div)`
  list-style: none;
  flex: 1;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 1rem 0;
  padding: 1.2rem 1rem;
  background: ${backgroundSecondary};
  border-radius: 0.75rem;

  h3 {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    margin: 0 0 0.8rem;;
    padding: 0.2rem 0;

    &.neutral {
      color: #d33079;
    }
    &.danger {
      color: #d2545d;
    }
    &.warning {
      color: #b5a200;
    }
  }

  p {
    margin: 0;
    color: ${textSecondary};
    font-size: 0.9rem;
    line-height: 1.2rem;
    font-variation-settings: 'wght' 490;
  }
`;