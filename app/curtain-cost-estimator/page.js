import React from 'react'
import Calculator from '../(Components)/calculator'
import { getSeoData } from '@/lib/seodata'
export async function generateMetadata() {
    return getSeoData({ page: 'curtain-cost-estimator' })
}
const CurtainCostEstimator = () => {
  return (
    <Calculator />
  )
}

export default CurtainCostEstimator