import styles from './feature-azure-cosmosdb.module.css';

/* eslint-disable-next-line */
export interface FeatureAzureCosmosdbProps {}

export function FeatureAzureCosmosdb(props: FeatureAzureCosmosdbProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FeatureAzureCosmosdb!</h1>
    </div>
  );
}

export default FeatureAzureCosmosdb;
