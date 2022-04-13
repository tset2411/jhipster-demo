package com.hrdk.myapp.service.impl;

import com.hrdk.myapp.domain.Facility;
import com.hrdk.myapp.repository.FacilityRepository;
import com.hrdk.myapp.service.FacilityService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Facility}.
 */
@Service
@Transactional
public class FacilityServiceImpl implements FacilityService {

    private final Logger log = LoggerFactory.getLogger(FacilityServiceImpl.class);

    private final FacilityRepository facilityRepository;

    public FacilityServiceImpl(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    @Override
    public Facility save(Facility facility) {
        log.debug("Request to save Facility : {}", facility);
        return facilityRepository.save(facility);
    }

    @Override
    public Facility update(Facility facility) {
        log.debug("Request to save Facility : {}", facility);
        return facilityRepository.save(facility);
    }

    @Override
    public Optional<Facility> partialUpdate(Facility facility) {
        log.debug("Request to partially update Facility : {}", facility);

        return facilityRepository
            .findById(facility.getId())
            .map(existingFacility -> {
                if (facility.getName() != null) {
                    existingFacility.setName(facility.getName());
                }
                if (facility.getFacilityId() != null) {
                    existingFacility.setFacilityId(facility.getFacilityId());
                }

                return existingFacility;
            })
            .map(facilityRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Facility> findAll(Pageable pageable) {
        log.debug("Request to get all Facilities");
        return facilityRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Facility> findOne(Long id) {
        log.debug("Request to get Facility : {}", id);
        return facilityRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Facility : {}", id);
        facilityRepository.deleteById(id);
    }
}
