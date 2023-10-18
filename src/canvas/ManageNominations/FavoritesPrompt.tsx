import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonPrimary } from '@polkadot-cloud/react';
import { useApi } from 'contexts/Api';
import { useNotifications } from 'contexts/Notifications';
import { useFavoriteValidators } from 'contexts/Validators/FavoriteValidators';
import type { Validator } from 'contexts/Validators/types';
import { Identity } from 'library/ListItem/Labels/Identity';
import { SelectWrapper } from 'library/ListItem/Wrappers';
import { Title } from 'library/Prompt/Title';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FavoritesPromptProps } from './types';

export const FavoritesPrompt = ({
  callback,
  nominations,
}: FavoritesPromptProps) => {
  const { t } = useTranslation('modals');
  const { consts } = useApi();
  const { addNotification } = useNotifications();
  const { favoritesList } = useFavoriteValidators();
  const { maxNominations } = consts;

  // Store the total number of selected favorites.
  const [selected, setSelected] = useState<Validator[]>([]);

  const addToSelected = (item: Validator) =>
    setSelected([...selected].concat(item));

  const removeFromSelected = (items: Validator[]) =>
    setSelected([...selected].filter((item) => !items.includes(item)));

  const remaining = maxNominations
    .minus(nominations.length)
    .minus(selected.length);

  const canAdd = remaining.isGreaterThan(0);

  return (
    <>
      <Title title={t('nominateFavorites')} closeText={t('cancel')} />
      <div style={{ padding: '1rem 1.5rem' }}>
        {remaining.isZero() ? (
          <h4 style={{ marginBottom: '1rem' }}>
            {t('moreFavoritesSurpassLimit', {
              max: maxNominations.toString(),
            })}
          </h4>
        ) : (
          <h4 style={{ marginBottom: '1rem' }}>
            {t('addUpToFavorites', { count: remaining.toNumber() })}.
          </h4>
        )}

        {favoritesList?.map((favorite: Validator, i) => {
          const inInitial = !!nominations.find(
            ({ address }: Validator) => address === favorite.address
          );
          const isDisabled = !canAdd || inInitial;

          return (
            <div
              key={`favorite_${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid var(--border-primary-color)',
                opacity: isDisabled ? 'var(--opacity-disabled)' : 1,
              }}
            >
              <SelectWrapper
                disabled={isDisabled}
                onClick={() => {
                  if (selected.includes(favorite))
                    removeFromSelected([favorite]);
                  else addToSelected(favorite);
                }}
              >
                {(inInitial || selected.includes(favorite)) && (
                  <FontAwesomeIcon icon={faCheck} transform="shrink-2" />
                )}
              </SelectWrapper>
              <Identity key={`favorite_${i}`} address={favorite.address} />
            </div>
          );
        })}

        <div style={{ margin: '1.5rem 0 0.5rem 0' }}>
          <ButtonPrimary
            text={t('addToNominations')}
            onClick={() => {
              callback(nominations.concat(selected));
              addNotification({
                title: t('favoritesAddedTitle', { count: selected.length }),
                subtitle: t('favoritesAddedSubtitle', {
                  count: selected.length,
                }),
              });
            }}
            disabled={selected.length === 0}
          />
        </div>
      </div>
    </>
  );
};