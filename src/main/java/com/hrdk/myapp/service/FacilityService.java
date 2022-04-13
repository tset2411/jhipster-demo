package com.hrdk.myapp.service;

import com.hrdk.myapp.domain.Facility;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Facility}.
 */
public interface FacilityService {
    /**
     * Save a facility.
     *
     * @param facility the entity to save.
     * @return the persisted entity.
     */
    Facility save(Facility facility);

    /**
     * Updates a facility.
     *
     * @param facility the entity to update.
     * @return the persisted entity.
     */
    Facility update(Facility facility);

    /**
     * Partially updates a facility.
     *
     * @param facility the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Facility> partialUpdate(Facility facility);

    /**
     * Get all the facilities.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Facility> findAll(Pageable pageable);

    /**
     * Get the "id" facility.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Facility> findOne(Long id);

    /**
     * Delete the "id" facility.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
