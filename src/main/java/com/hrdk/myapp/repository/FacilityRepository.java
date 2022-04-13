package com.hrdk.myapp.repository;

import com.hrdk.myapp.domain.Facility;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Facility entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {}
