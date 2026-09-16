import FleetShowcase from '@/components/ui/FleetShowcase/FleetShowcase'
import Header from '@/components/ui/Header/Header'
import Hero from '@/components/ui/Hero/HeroDynamic'
import VehicleFlexibleServices from '@/components/ui/VehicleFlexibleServices/VehicleFlexibleServices'
import VehicleShowcase from '@/components/ui/VehicleShowcase/VehicleShowcase'
import React from 'react'

export default function page() {
  return (
    <>
    <Header/>
    <FleetShowcase/>
    <VehicleFlexibleServices/>
    <VehicleShowcase/>
    </>
  )
}
