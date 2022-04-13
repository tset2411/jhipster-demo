package com.hrdk.myapp.service.impl;

import com.hrdk.myapp.domain.Resident;
import com.hrdk.myapp.repository.ResidentRepository;
import com.hrdk.myapp.service.ResidentService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Resident}.
 */
@Service
@Transactional
public class ResidentServiceImpl implements ResidentService {

    private final Logger log = LoggerFactory.getLogger(ResidentServiceImpl.class);

    private final ResidentRepository residentRepository;

    public ResidentServiceImpl(ResidentRepository residentRepository) {
        this.residentRepository = residentRepository;
    }

    @Override
    public Resident save(Resident resident) {
        log.debug("Request to save Resident : {}", resident);
        return residentRepository.save(resident);
    }

    @Override
    public Resident update(Resident resident) {
        log.debug("Request to save Resident : {}", resident);
        return residentRepository.save(resident);
    }

    @Override
    public Optional<Resident> partialUpdate(Resident resident) {
        log.debug("Request to partially update Resident : {}", resident);

        return residentRepository
            .findById(resident.getId())
            .map(existingResident -> {
                if (resident.getResidentId() != null) {
                    existingResident.setResidentId(resident.getResidentId());
                }
                if (resident.getFirstName() != null) {
                    existingResident.setFirstName(resident.getFirstName());
                }
                if (resident.getLastName() != null) {
                    existingResident.setLastName(resident.getLastName());
                }
                if (resident.getEmail() != null) {
                    existingResident.setEmail(resident.getEmail());
                }
                if (resident.getPhoneNumber() != null) {
                    existingResident.setPhoneNumber(resident.getPhoneNumber());
                }

                return existingResident;
            })
            .map(residentRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Resident> findAll(Pageable pageable) {
        log.debug("Request to get all Residents");
        return residentRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Resident> findOne(Long id) {
        log.debug("Request to get Resident : {}", id);
        return residentRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Resident : {}", id);
        residentRepository.deleteById(id);
    }
}
